<template>
  <div class="row" style="flex-direction: column">
    <div class="heading3 padding-right-20">FAQS</div>
    <div class="subheading3">Frequently asked questions</div>
    <div class="accordion" role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-1 variant="info">{{
            mswaliFaqs[0].question
          }}</b-button>
        </b-card-header>
        <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text> {{ mswaliFaqs[0].answer }}</b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
    <div class="accordion" role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-2 variant="info">{{
            mswaliFaqs[1].question
          }}</b-button>
        </b-card-header>
        <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text> {{ mswaliFaqs[1].answer }}</b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
    <div class="accordion" role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-3 variant="info">{{
            mswaliFaqs[2].question
          }}</b-button>
        </b-card-header>
        <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text> {{ mswaliFaqs[2].answer }}</b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
    <div class="accordion" role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-4 variant="info">{{
            mswaliFaqs[3].question
          }}</b-button>
        </b-card-header>
        <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text> {{ mswaliFaqs[3].answer }}</b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
    <div class="accordion" role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-5 variant="info">{{
            mswaliFaqs[4].question
          }}</b-button>
        </b-card-header>
        <b-collapse id="accordion-5" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text> {{ mswaliFaqs[4].answer }}</b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
    <div class="accordion" role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-6 variant="info">{{
            mswaliFaqs[5].question
          }}</b-button>
        </b-card-header>
        <b-collapse id="accordion-6" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text> {{ mswaliFaqs[5].answer }}</b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
    <div class="accordion" role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-7 variant="info">{{
            mswaliFaqs[6].question
          }}</b-button>
        </b-card-header>
        <b-collapse id="accordion-7" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text> {{ mswaliFaqs[6].answer }}</b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
    <div class="accordion" role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-8 variant="info">{{
            mswaliFaqs[7].question
          }}</b-button>
        </b-card-header>
        <b-collapse id="accordion-8" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text> {{ mswaliFaqs[7].answer }}</b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
    <div class="accordion" role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-9 variant="info">{{
            mswaliFaqs[8].question
          }}</b-button>
        </b-card-header>
        <b-collapse id="accordion-9" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text> {{ mswaliFaqs[8].answer }}</b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
    <br />
  </div>
</template>

<script>
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
};
</script>
