<template>
  <div class="align-center" style="flex-direction: column">
    <div class="heading3 padding-right-20">FAQS</div>
    <div class="subheading3">Frequently asked questions</div>
    <div v-for="faq in mswaliFaqs">
      <details
        style="background-color: #ffb500; margin-block: 10px; padding: 10px"
      >
        <summary class="heading4">{{ faq.question }}</summary>
        {{ faq.answer }}
      </details>
    </div>
    <br />
  </div>
</template>

<script>
export default {
  data() {
    return {
      mswaliFaqs: [
        {
          question: "What is mSwali?",
          answer:
            "mSwali is a QUIZ league where winners get CASH prizes by simply choosing the correct answers from general knowledge multiple choice questions.",
        },
        {
          question: "How do I register on mSwali?",
          answer:
            "You can Play mSwali at quiz.mswali.co.ke or Simply Dial *397#",
        },
        {
          question: "How do I win the mSwali Quiz session jackpot?",
          answer:
            "To win the Quiz session prize, answer ALL the Quiz questions CORRECTLY within 15 seconds EACH.",
        },
        {
          question:
            "How do I win the mSwali League to be the King/Queen of Quiz?",
          answer:
            "Simply play as many mSwali sessions as possible and accumulate as many points, from correctly answered questions, which will allow you to participate in the knockout competition, the winner of which will be the King/Queen of Quiz.",
        },
        {
          question: "When is the mSwali Quiz played?",
          answer:
            "Play mSwali Quiz any time from 10am to 10pm every Monday to Saturday.",
        },
        {
          question: "How will I know that I have won the mSwali Quiz?",
          answer:
            "You WIN when you answer ALL the Quiz questions CORRECTLY within 15 seconds EACH",
        },
        {
          question: "How will I receive my money when I win?",
          answer:
            "Your prize money is sent to your mSwali wallet automatically at the end of the winning Quiz session. You can then withdraw from your mSwali wallet to your MPESA. NB: A tax rate of 15% applies to each win",
        },
        {
          question: "How much will it cost to play an mSwali Quiz?",
          answer:
            "Each mSwali Quiz costs 50/=, To play four quizzes for the day costs Kshs. 100/=, To play eight quizzes for the day costs Kshs. 200/= (expires at midnight on the same day).",
        },
        {
          question: "How many times can I play during an mSwali Quiz session?",
          answer: "You can only play one mSwali Quiz session once.",
        },
      ],
    };
  },
};
</script>
