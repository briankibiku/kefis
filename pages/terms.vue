<template>
  <div
    class="purple-container"
    style="
      padding: 20px;
      display: flex;
      justify-content: center;
      position: relative;
    "
  >
    <div style="position: absolute">
      <LogoCyan />
      <h4>Accept Terms & Conditions</h4>

      <ol>
        <li>
          mSwali has six sessions per day i.e. 10 – 10.10a.m, 11 – 11.10a.m, 1 –
          1.10p.m, 2 – 2.10p.m, 6 – 6.10p.m and 7 – 7.10p.m
        </li>
        <li>mSwali session is charged at 20/=</li>
        <li>Each mSwali session has ten questions</li>
        <li>Each of the ten questions is timed at 10 seconds</li>
        <li>
          To WIN the trivia a user has to answer correctly ALL the ten questions
        </li>
        <li>
          Each question answered correctly earns a user 10points on the
          leaderboard
        </li>
        <li>
          The leaderboard displays the top 10 players with their earned points
          earned
        </li>
        <li>To access all the SIX sessions in a day a user has to pay 50/=</li>
        <li>
          If a first-time user deposits 20/= they get a free session to play, if
          they deposit amounts greater than 20/= but not less than 50/= they get
          the whole day for free
        </li>
        <li>
          The daily rate of 50/= is not applicable after the 2 – 2.10p.m session
          but applicable between 7.10p.m to 2.10p.m of the following day.
        </li>
        <li>
          A user can select if they want to pay per session or for the whole
          day. This is activated once the user has accessed a session.
        </li>
        <li>
          During a game session a user is notified if they got a question wrong
          and they can proceed without winning the trivia. They only earn points
          for each question answered correctly.
        </li>
        <li>
          The prize money for each session is 5,000/= and is shared amongst all
          the winners at the end of each session
        </li>
        <li>
          On signing up a user has to enter their name and accept mSwali’s terms
          and conditions
        </li>
        <li>
          Once the T & C’s are accepted the user goes through 3 example
          questions to get a feel of the game
        </li>
        <li>
          On completion of the signup process, the user can deposit money into
          their mSwali wallet
        </li>
        <li>mSwali Wallet allows users to:</li>
        <li>mSwali has practice questions which can be played at any time.</li>
        <li>
          mSwali has a subscription service where users can receive daily
          interesting facts at a fee. These facts can appear as questions in the
          live sessions.
        </li>
        <li>mSwali users can check their standings on the leaderboard</li>
        <li>
          mSwali users can refer their friends to play mSwali and get rewarded
          with 1 credit worth 20/= for a free mSwali session. The deposit made
          by the referred user determines what the referee gets e.g. if a
          referral deposits 20/= the referee gets a free session or if a
          referral deposits 50/= the referee gets a whole day.
        </li>
        <li>
          mSwali users have an option to choose if they want to pay for a
          session or a whole day, and this money is deducted from the user’s
          wallet
        </li>
        <li>
          When a user’s session times out, the user can pick up where they left
          before the time-out.
        </li>
        <li>
          ALL deposits and withdrawals are subject to taxes and costs charged at
          prevailing rates.
        </li>
        <br />
        <b>
          The activation sessions prize will be 2,000/= and the normal session
          is 5,000/=
        </b>
      </ol>
      <b-button
        type="submit"
        href="/signup"
        form="otp-form"
        class="primary-button"
      >
        Done reading
      </b-button>
    </div>

    <!-- <notificatons group="foo" /> -->
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "verify",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "",
        },
      ],
    };
  },

  methods: {
    async onSubmit() {
      const config = {
        headers: {
          Accept: "application/json",
        },
      };

      this.$router.push("/otp");
    },
  },
};
</script>

<style>
@media only screen and (max-width: 600px) {
  .container-otp {
    position: fixed;
    top: 0px;
    bottom: 0px;
    background: #160d3d;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  h3 {
    margin-top: 70px;
    color: #1ceded;
    font-style: normal;
    font-size: 20px;
    text-align: center;
    padding: 0px 10px;
  }

  h5 {
    padding-top: 10px;
    color: #1ceded;
    width: 196px;
    margin: auto;
  }

  .otp-header {
    /* position:fixed; */
    /* display:flex; */
    /* flex-direction:column; */
    background: #160d3d;
    width: 100%;
    top: 0px;
    align-content: center;
  }
  p {
    color: white;
    padding: 2px;
    margin: 0px 20px;
    font-size: 14px;
    text-align: justify;
  }

  .Logo {
    align-content: center;
    margin-top: 90px;
  }
}
</style>
