import { createSpinner } from 'nanospinner';

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
async function handleAnswer(isFlse, ans) {
  const spinner = createSpinner('Checking...').start();
  await sleep();

  if (!isFlse) {
    spinner.success({ text: `Nice you are Selected ${ans}` });
  } else {
    spinner.error({ text: `Ohh Something Went Rong` });
    process.exit(1);
  }
}

export default handleAnswer;