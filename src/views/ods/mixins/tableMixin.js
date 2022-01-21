export default {
  data() {
    return {
      showSearch: true,
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 40],
      },
      selectList: [],
      searchForm: {},
      form: {},
      tableLoading: false,
      status: "update",
      formTitle: {
        create: "新增",
        update: "编辑",
        detail: "详情",
      },
      formStatus: {
        create: "create",
        update: "update",
        detail: "detail",
      },
      btnLoading: false,
      dialogShow: false,
      customFields: [], //自定义字段
      refresh: false, //刷新状态
    };
  },
  methods: {
    //搜索回调
    searchChange(params) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const searchForm = Object.assign(params, this.searchForm);
    },
    // 排序
    sortChange(column) {
      if (column.order) {
        this.searchForm.orderKey = column.prop;
        this.searchForm.orderValue = column.order === 'descending' ? 2 : 1;
      } else {
        delete this.searchForm.orderKey;
        delete this.searchForm.orderValue;
      }
      this.getList(this.page);
    },
    //刷新回调
    refreshChange() {
      this.getList(this.page);
    },
    handleFilter() {
      for (const key in this.searchForm) {
        if (this.searchForm[key] === "" || this.searchForm[key] === null) {
          this.searchForm[key] = undefined;
        }
      }
      this.page.currentPage = 1;
      setTimeout(() => {
        this.getList(this.page, this.searchForm);
      }, 10);
    },
    getList() { },
    // 勾选数据
    selectionChange(list) {
      this.selectList = list;
    },
    // 页码变化
    currentChange(val) {
      this.page.currentPage = val;
    },
    // 页面数量变化
    sizeChange(val) {
      this.page.currentPage = 1;
      this.page.pageSize = val;
    },
    // 批量删除,参数为id的数组
    _handleDelete(optFunction, Ids) {
      if (Ids === undefined || Ids.length === 0) {
        this.$message({
          showClose: true,
          message: "未选择不能批量删除,请选择后操作!",
          type: "warning",
        });
        return;
      }
      this.$confirm(`是否确认删除该数据？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return optFunction(Ids);
        })
        .then(res => {
          if (res.data.code == 0) {
            this.$message({
              showClose: true,
              type: "success",
              message: `删除成功!`,
            });
          } else {
            this.$message({
              showClose: true,
              type: "info",
              message: `删除失败，${res.data.msg}`,
            });
          }
          this.getList();
        });
    },
    // 批量删除，结果自定义
    _deleteQuery(optFunction, Ids, text) {
      return new Promise(resolve => {
        if (Ids.length > 0) {
          this.$confirm(text ? text : "是否确认删除该数据？", "提示", {
            type: "warning",
          })
            .then(() => {
              return optFunction(Ids);
            })
            .then(res => {
              resolve(res);
            })
            .catch(() => {
              resolve();
            });
        } else {
          this.$message({
            showClose: true,
            message: "未选择不能批量删除,请选择后操作!",
            type: "warning",
          });
          resolve();
        }
      });
    },
    handelBatch(optFunction, Ids, text = "操作") {
      return new Promise((resolve, reject) => {
        if (Ids === undefined || Ids.length === 0) {
          this.$message({
            showClose: true,
            message: `未选择不能批量${text},请选择后操作!`,
            type: "warning",
          });
          return;
        }
        this.$confirm(`请确认是否${text}`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        })
          .then(() => {
            return optFunction(Ids);
          })
          .then(res => {
            if (res.data.code == 0) {
              this.$message({
                showClose: true,
                type: "success",
                message: `${text}成功!`,
              });
              resolve();
              this.getList();
            } else {
              this.$message({
                showClose: true,
                type: "info",
                message: `${text}失败，${res.data.msg}`,
              });
              reject();
            }
          });
      });
    },
    _submit(optFunction, Ids) {
      if (Ids === undefined || Ids.length === 0) {
        this.$message({
          showClose: true,
          message: "未选择不能批量提交,请选择后操作!",
          type: "warning",
        });
        return;
      }
      this.$confirm(`确定要提交吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return optFunction(Ids);
        })
        .then(res => {
          if (!res.data.code) {
            this.$message({
              showClose: true,
              type: "success",
              message: `提交成功!`,
            });
          } else {
            this.$message({
              showClose: true,
              type: "info",
              message: `提交失败，${res.data.msg}`,
            });
          }
          this.getList();
        });
    },
    handlePassBatch(optFunction, Ids) {
      return new Promise(resolve => {
        if (Ids === undefined || Ids.length === 0) {
          this.$message({
            showClose: true,
            message: "未选择不能批量审核,请选择后操作!",
            type: "warning",
          });
          return;
        }
        this.$confirm("请确认是否通过", "审核", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        })
          .then(() => {
            return optFunction(Ids);
          })
          .then(res => {
            if (res.data.code == 0) {
              this.$message({
                showClose: true,
                type: "success",
                message: `审核成功!`,
              });
              this.dialogShow = false;
              resolve();
            } else {
              this.$message({
                showClose: true,
                type: "info",
                message: `审核失败，${res.data.msg}`,
              });
            }
          });
      });
    },
    handleRejectBatch(optFunction, Ids) {
      return new Promise(resolve => {
        if (Ids === undefined || Ids.length === 0) {
          this.$message({
            showClose: true,
            message: "未选择不能批量审核,请选择后操作!",
            type: "warning",
          });
          return;
        }
        this.$prompt("请输入驳回理由", "驳回", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPlaceholder: "请输入100字以内的内容",
          inputValidator: value => {
            if (value !== null && value.length > 0) {
              const text = value.replace(/\s+/g, "");
              if (text.length > 100) {
                return "请输入100字以内的内容";
              }
              return text === "" ? false : true;
            } else {
              return false;
            }
          },
          inputErrorMessage: "请填写驳回理由",
        })
          .then(({
            value,
          }) => {
            const text = value.replace(/\s+/g, "");
            return optFunction(Ids, text);
          })
          .then(res => {
            if (res.data.code == 0) {
              this.$message({
                showClose: true,
                type: "success",
                message: `驳回成功!`,
              });
              this.dialogShow = false;
              resolve();
            } else {
              this.$message({
                showClose: true,
                type: "info",
                message: `驳回失败，${res.data.msg}`,
              });
            }
          });
      });
    },
    deptChange() {
      this.$set(this.form, "systemId", null);
      this.$refs.sysSearch.refresh();
    },
    //手动刷新模块
    async handleRefresh() {
      this.refresh = false;
      await this.$nextTick();
      this.refresh = true;
    },
  },
  watch: {
    "page.total": {
      handler(newVal) {
        const total = newVal;
        const currentPage = this.page.currentPage;
        const pageSize = this.page.pageSize;
        if (total !== 0 && !(total > pageSize * (currentPage - 1))) {
          const result = total / pageSize;
          const v =
            total <= pageSize * currentPage &&
            total > pageSize * (currentPage - 1);
          if (total / pageSize === 0 && !v) {
            this.page.currentPage = Math.ceil(result);
          } else if (!v) {
            this.page.currentPage = Math.ceil(result);
          }
          setTimeout(() => {
            this.getList();
          }, 50);
        }
      },
      deep: true,
    },
  },
};
