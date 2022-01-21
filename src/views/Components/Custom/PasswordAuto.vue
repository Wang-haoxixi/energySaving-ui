<script>
import VuePassword from "./Password.vue";
function scorePassword(pass) {
  let score = 0;
  if (!pass) return score;

  // award every unique letter until 5 repetitions
  const letters = new Object();
  for (let i = 0; i < pass.length; i++) {
    letters[pass[i]] = (letters[pass[i]] || 0) + 1;
    score += 5.0 / letters[pass[i]];
  }

  // bonus points for mixing it up
  const variations = {
    digits: /\d/.test(pass),
    lower: /[a-z]/.test(pass),
    upper: /[A-Z]/.test(pass),
    nonWords: /\W/.test(pass),
  };

  let variationCount = 0;
  for (const check in variations) {
    variationCount += variations[check] == true ? 1 : 0;
  }
  score += (variationCount - 1) * 10;

  return parseInt(score);
}

function checkPassStrength(pass) {
  const score = scorePassword(pass);
  if (score > 70) return 4;
  if (score > 50) return 3;
  if (score >= 20) return 2;
  if (score >= 10) return 1;
  return 0;
}
export default {
  name: "IepPasswordAuto",
  functional: true,
  components: { VuePassword },
  render(h, context) {
    const data = context.data;
    // const inputs = Array.isArray(context.props.userInputs)
    //   ? context.props.userInputs
    //   : [];
    const strength = checkPassStrength(data.attrs.value) || 0;
    return h(VuePassword, {
      props: {
        ...data.attrs,
        strength,
      },
      on: context.listeners,
      scopedSlots: context.scopedSlots,
    });
  },
};
</script>
