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
      limit: Math.floor(limit) / 3,
    });
    const results = this.getResults([
      { type: 'exam', items: exams },
      { type: 'question', items: questions },
      { type: 'test', items: tests },
    ]);

    return { message: 'Search results are ready!', results };
  }

  getResults(options) {
    return options.reduce((acc, { items, type }) => {
      return acc.concat(items.map((item) => ({ type, item })));
    }, []);
  }
}
