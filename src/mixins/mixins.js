import { pageOption } from "@/const/pageConfig";
// import { addParamsToLocation } from '@/util/util';
export default {
  data() {
    return {
      pagedTable: [],
      multipleSelection: [],
      isLoadTable: true,
      isRoute: false,
      pagination: pageOption(),
      pageOption: pageOption(),
      searchForm: {},
      queryForm: {},
      iepPageSize: 10,
    };
  },
  created() {
    this.pagination = this._pageOption();
    this.pageOption = this._pageOption();
  },
  methods: {
    /**
     * 初始化分页
     * @param {*} isRoute true 就保留分页记录, false就不保留
     */
    _pageOption(isRoute = true) {
      if (isRoute) {
        const page = {
          current: +this.$route.query.current || 0,
          size: +this.$route.query.size || 0,
        };
        if (page.current && page.size) {
          return page;
        }
        return pageOption(this.iepPageSize);
      } else {
        return pageOption(this.iepPageSize);
      }
    },
    searchPage(inputSearchForm = undefined) {
      this.pageOption = this._pageOption(false);
      this.searchForm = inputSearchForm ?? this.searchForm;
      const newForm = { ...this.searchForm, ...this.queryForm };
      if (this.isRoute) {
        const query = { ...newForm, ...this.pageOption };
        // console.log(document.location.pathname, this.$route.path);
        // debugger;
        // if (document.location.pathname !== this.$route.path) {
        this.$router.replace({
          query,
        });
        // } else {
        // addParamsToLocation(query, this.$route);
        // }
      }
      this.loadPage(newForm);
    },
    async loadTable(param, requestFn, fn = m => m) {
      this.isLoadTable = true;
      const { data } = await requestFn({ ...this.pageOption, ...param });
      const { records, size, total, current } = data;
      const isBug = total / size + 1 === current;
      if (isBug && total !== 0) {
        this.searchPage(); // 防止分页为空页的情况
      } else {
        this.pagination = { current, size, total };
      }
      this.pagedTable = records.map(fn);
      this.isLoadTable = false;
      return data;
    },
    handlePaginationSizeChange(val) {
      this.pageOption.size = val;
      this.loadPage(this._useRoutePage());
    },
    handlePaginationCurrentChange(val) {
      this.pageOption.current = val;
      this.loadPage(this._useRoutePage());
    },
    _useRoutePage() {
      if (this.isRoute) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { current, size, ...newForm } = this.$route.query;
        const query = { ...this.pageOption, ...newForm };
        this.searchForm = newForm;
        this.$router.replace({
          query,
        });
        return query;
      } else {
        return undefined;
      }
    },
  },
};
