<template>
  <div>
    <!--Big screen device code begins here-->
    <div
      class="d-none d-md-block d-lg-none d-none d-lg-block d-xl-none d-none d-xl-block"
      style="padding: 40px"
    >
      <div class="row" style="padding-left: 50px">
        <!--Big screen sidebar navigation starts here-->
        <div
          id="col1"
          style="
            justify-content: center;
            align-items: center;
            text-align: center;
          "
        >
          <div style="text-align: left">
            <NuxtLink to="/home">
              <LogoPurple style="height: 27px; width: 120px" />
            </NuxtLink>
          </div>
          <LargeScreenNavBar />
        </div>
        <!--Big screen sidebar navigation starts here-->

        <div id="col2">
          <!-- salutations, wallet card, statistics cards go here -->
          <div class="d-flex flex-row" style="padding-top: 0em">
            <div class="col padding-left-60 d-flex justify-content-around">
              <Faq />
            </div>
          </div>
        </div>
        <!--Search bar / Start quiz button / Profile  Ends here-->
      </div>
    </div>
    <div class="d-block d-sm-none d-none d-sm-block d-md-none">
      <div class="painted-background" style="padding: 20px">
        <Faq />
      </div>
    </div>
  </div>
</template>

<script>
import Faq from "../../components/Faq.vue";
export default {
  data() {
    return {
      text: `
          You have deposited Kshs 100.00
        `,
      mswaliFaqs: [
        {
          id: "accordion-1",
          question: "What is mSwali?",
          answer:
            "mSwali is a QUIZ league where winners get CASH prizes by simply choosing the correct answers from general knowledge multiple choice questions.",
        },
        {
          id: "accordion-2",
          question: "How do I register on mSwali?",
          answer: "Simply Dial *397#",
        },
        {
          id: "accordion-3",
          question: "How do I win the mSwali Quiz session jackpot?",
          answer:
            "To win the Quiz session prize, answer ALL the Quiz questions CORRECTLY within 15 seconds EACH.",
        },
        {
          id: "accordion-4",
          question:
            "How do I win the mSwali League to be the King/Queen of Quiz?",
          answer:
            "Simply play as many mSwali sessions as possible and accumulate as many points, from correctly answered questions, which will allow you to participate in the knockout competition, the winner of which will be the King/Queen of Quiz.",
        },
        {
          id: "accordion-5",
          question: "When is the mSwali Quiz played?",
          answer:
            "Play mSwali Quiz any time from 10am to 10pm every Monday to Saturday.",
        },
        {
          id: "accordion-6",
          question: "How will I know that I have won the mSwali Quiz?",
          answer:
            "You WIN when you answer ALL the Quiz questions CORRECTLY within 15 seconds EACH",
        },
        {
          id: "accordion-7",
          question: "How will I receive my money when I win?",
          answer:
            "Your prize money is sent to your mSwali wallet automatically at the end of the winning Quiz session. You can then withdraw from your mSwali wallet to your MPESA. NB: A tax rate of 15% applies to each win",
        },
        {
          id: "accordion-8",
          question: "How much will it cost to play an mSwali Quiz?",
          answer:
            "Each mSwali Quiz costs 50/=, To play four quizzes for the day costs Kshs. 100/=, To play eight quizzes for the day costs Kshs. 200/= (expires at midnight on the same day).",
        },
        {
          id: "accordion-9",
          question: "How many times can I play during an mSwali Quiz session?",
          answer: "You can only play one mSwali Quiz session once.",
        },
      ],
    };
  },
  components: { Faq },
};
</script>

<style scoped>
.hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #000;
  margin: 1em 0;
  padding: 0;
}
.left,
.right {
  padding-left: 40px;
  width: 25%;
}

.middle {
  width: 50%;
}
.column {
  float: left;
  padding: 10px;
  height: 150px; /* Should be removed. Only for demonstration */
}
.row {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding-top: 20px;
}
#col1 {
  width: 20%;
}
#col2 {
  width: 80%;
}
</style>
