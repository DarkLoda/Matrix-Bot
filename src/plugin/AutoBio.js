let autoBioInterval;
let autoBioEnabled = false;

const startAutoBio = (Matrix) => {
  autoBioInterval = setInterval(() => {
    if (autoBioEnabled) {
      setAbout(Matrix);
    }
  }, 10000);
};

const setAbout = (Matrix) => {
  const status = `📆 ${new Date().toLocaleDateString()} ⌚ ${new Date().toLocaleTimeString()} AutoBio ⚡`;
  Matrix.updateProfileStatus(status);
};

const autoBio = async (m, Matrix) => {
  const message = m.body.toLowerCase();

  if (message === '/autobio on') {
    autoBioEnabled = true;
    await Matrix.sendMessage(m.from, { text: 'Auto bio activated!' });
    startAutoBio(Matrix);
  } else if (message === '/autobio off') {
    autoBioEnabled = false;
    clearInterval(autoBioInterval);
    await Matrix.sendMessage(m.from, { text: 'Auto bio disabled. Remove the plugin for complete removal.' });
  }
};

export default autoBio;
