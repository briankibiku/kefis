<template>
  <main>
    <b-row>
      <b-col>
        <p class="title text-color-mswali text-center">{{ title }}</p>
        <div class="d-grid justify-content-center">
          <table class="table">
            <!--d-grid justify-content-center -->
            <thead>
              <tr>
                <th
                  class="
                    table-label
                    text-color-mswali text-center
                    border-bottom-none
                  "
                  scope="col"
                >
                  {{ tableLabel.label1 }}
                </th>
                <th
                  class="
                    table-label
                    text-color-mswali text-left
                    border-bottom-none
                  "
                  scope="col"
                >
                  {{ tableLabel.label2 }}
                </th>
                <th
                  class="
                    table-label
                    text-color-mswali text-center
                    border-bottom-none
                  "
                  scope="col"
                >
                  {{ tableLabel.label3 }}
                </th>
              </tr>
            </thead>
            <tbody style="height: 20px; overflow: auto">
              <tr
                v-for="(score, index) in scores"
                :key="index"
                class="table-label"
              >
                <td class="text-center table-label">{{ index + 1 }}</td>
                <td class="text-left table-label">{{ score.name }}</td>
                <td class="text-center table-label">{{ score.points }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-col>
    </b-row>
  </main>
</template>
<style scoped>
.text-color-mswali {
  color: #160d3d !important;
}
.title {
  font-size: 20px;
  justify-content: center;
  /* text-align-last:justify; */
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 36px;

  /* or 150% */
  letter-spacing: 0.03em;
}
.table-label {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 14px;

  /* identical to box height, or 100% */
  letter-spacing: 0.02em;
}

table {
  border-collapse: separate;
  border-spacing: 0 7px;
  margin-top: -10px; /* correct offset on first border spacing if desired */
}
td {
  border: 0.7px solid #160d3d;
  border-style: solid none;
  padding: 10px;
  background-color: #160d3d;
  color: white;
}
td:first-child {
  border-left-style: solid;
  border-top-left-radius: 31px;
  border-bottom-left-radius: 31px;
}
td:last-child {
  border-right-style: solid;
  border-bottom-right-radius: 31px;
  border-top-right-radius: 31px;
}
.d-grid {
  display: grid;
}
.border-bottom-none {
  border-bottom: none;
}
</style>
<script>
export default {
  data() {
    return {
      title: "Session Scores",
      tableLabel: {
        label1: "Rank",
        label2: "Username",
        label3: "Points Earned",
      },
      scores: [
        {
          name: "Chris Obure",
          points: 400,
        },
        {
          name: "Martin Omwenga",
          points: 400,
        },
        {
          name: "Sharon Mito",
          points: 400,
        },
      ],
    };
  },
};
</script>
