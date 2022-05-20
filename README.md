# Description and Live preview

Web application developed in React, which consumes data from the [GitHub public API](https://docs.github.com/en/rest/search) and pages it with npm [react-paginate](https://www.npmjs.com/package/react-paginate).

Due to API restrictions, only the first 1,000 requests are available, however, paging is done based on the total data returned by the API (total_count). The number of requests is also limited to 5,000 per hour, returning error 403 when it is exceeded.

[Live preview](https://rojaslabs.github.io/github-user-search/)