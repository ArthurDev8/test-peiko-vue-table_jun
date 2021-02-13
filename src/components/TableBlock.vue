<template>
  <div class="table-block">
    <button @click="fetchData" class="fetchButton">Get data</button>
    <div class="content">
      <Loader v-if="loader" />
      <div v-else>
        <div class="table" v-if="Object.keys(payload).length > 0">
          <div class="row">
            <div class="column">
              <span class="table-title">Stock</span>
              <span
                class="table-value"
                v-for="(stocks, key) in payload.stocks"
                :key="key"
                >{{ stocks }}</span
              >
            </div>
            <div class="column center">
              <span class="table-title">Current</span>
              <span
                class="table-value"
                v-for="(start, key) in payload.start"
                :key="key"
                >{{ start.toFixed(2) }}</span
              >
            </div>
            <div class="column end">
              <span class="table-title">Change</span>
              <span
                class="table-value"
                v-for="(current, key) in change"
                :key="key"
                :class="classColor(current)"
                >{{ current.toFixed(2) }}</span
              >
            </div>
          </div>
        </div>
        <div class="no-data" v-else>No data</div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader";
export default {
  components: {
    Loader,
  },
  computed: {
    change() {
      let start = this.payload.start;
      let cur = this.payload.current;
      let count = start.length > cur.length ? start.length : cur.length;
      let change = [];
      for (let i = 0; i < count; i++) {
        if (start[i] === undefined) {
          start.push(0);
        } else {
          if (cur[i] === undefined) {
            cur.push(0);
          }
        }
        change.push(start[i].toFixed(2) - cur[i].toFixed(2));
      }
      return change;
    },
  },
  props: {
    payload: {
      type: Object,
      default: Function,
    },
    loader: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    fetchData() {
      this.$emit("getData");
    },
    classColor(value) {
      if (value.toFixed(2) > 0.0) {
        return "green";
      }
      if (value.toFixed(2) < 0.0) {
        return "red";
      } else {
        return "black";
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.table {
  border: 2px solid #ededed;
  max-width: 300px;
  margin: 0 auto;
  .row {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .column {
    display: flex;
    flex-direction: column;
    text-align: start;
    width: 100px;
    overflow: hidden;
    .table-title {
      font-size: 18px;
      font-weight: bold;
      padding: 15px;
      border-bottom: 2px solid #ededed;
      background-color: #f5f5f5;
    }
    .table-value {
      color: #585858;
      padding: 15px;
      border-bottom: 2px solid #ededed;
    }
    .green {
      color: green;
    }
    .red {
      color: red;
    }
    .table-value:last-child {
      border-bottom: none;
    }
    &.center {
      text-align: center;
    }
    &.end {
      text-align: end;
    }
  }
}
.no-data {
  font-size: 27px;
  font-weight: bold;
  padding: 15px;
  color: red;
}

.fetchButton {
  margin: 25px 0 15px;
  background-color: #f5f5f5;
  cursor: pointer;
  padding: 15px 25px;
  font-size: 20px;
  border: 2px solid #ededed;
  border-radius: 5px;
  transition: 0.4s;
  color: #404040;
  &:hover {
    background-color: #43bad6;
    color: white;
  }
  &:focus {
    outline: none;
  }
}
.content {
  margin: 10px;
  .body {
    margin: 10px;
    padding: 30px;
  }
}
</style>