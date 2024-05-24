import { Controller, Get, Query } from '@nestjs/common';
import { UseSessionGuard } from '../auth/decorators/session-guard.decorator';
import { SearchQueryDto } from './dto/search-query.dto';
import { SearchService } from './search.service';

@Controller('search')
@UseSessionGuard()
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async search(@Query() { query, limit }: SearchQueryDto) {
    const { exams, questions, tests } = await this.searchService.serachEverything({
      search: query,
      limit,
    });
    const results = this.getResults(limit, {
      exam: exams.exams,
      test: tests.tests,
      question: questions,
    });

    return { message: 'Search results are ready!', results };
  }

  getResults(limit: number, options: Record<'exam' | 'question' | 'test', unknown[]>) {
    const totalItems = Object.values(options).reduce((acc, items) => acc + items.length, 0);
    const typesCount = Object.keys(options).length;
    const minLimit = Math.min(limit, totalItems);

    let usedLimit = 0;

    const initialAllocation = Object.entries(options).map(([type, items]) => {
      const idealCount = Math.floor(minLimit / typesCount);
      const count = Math.min(idealCount, items.length);
      usedLimit += count;
      return { type, items, count };
    });

    const remainingLimit = minLimit - usedLimit;
    if (remainingLimit > 0) {
      for (let i = 0; i < initialAllocation.length && usedLimit < minLimit; i++) {
        const possibleAddition = Math.min(
          options[initialAllocation[i].type].length - initialAllocation[i].count,
          remainingLimit,
        );
        initialAllocation[i].count += possibleAddition;
        usedLimit += possibleAddition;
      }
    }

    return initialAllocation.flatMap(({ type, items, count }) =>
      items.slice(0, count).map((item) => ({ type, item })),
    );
  }
}
