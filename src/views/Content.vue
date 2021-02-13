<template>
  <div class="content">
    <div class="button-block">
      <TableBlock
        :payload="this.dataTable"
        @getData="getData"
        :loader="this.loader"
      />
    </div>
  </div>
</template>

<script>
import { request } from "@/services/data.services";
import TableBlock from "@/components/TableBlock";

export default {
  data: () => ({
    dataTable: {},
    loader: false,
  }),
  components: {
    TableBlock,
  },
  methods: {
    async getData() {
      this.loader = true;
      try {
        this.dataTable = await request();
      } catch (error) {
        this.dataTable = {};
        console.error(`data - ${error}`);
      }
      this.loader = false;
    },
  },
};
</script>

<style lang='scss' scoped>
</style>