let autoBioInterval;
let autoBioEnabled = false;

const startAutoBio = (Matrix) => {
  autoBioInterval = setInterval(() => {
    if (autoBioEnabled) {
      const status = `📆 ${new Date().toLocaleDateString()} ⌚ ${new Date().toLocaleTimeString()} Matrix ⚡`;
      Matrix.updateProfileStatus(status)
      Matrix.sendMessage(Matrix.user.id, { text: 'AutoBio Activated' });
    }
  }, 10000);
};

const autoBio = async (m, Matrix) => {
  if (autoBioEnabled) {
    startAutoBio(Matrix);
  }
  const message = m.body.toLowerCase();

  if (message === '/autobio on' && !autoBioEnabled) {
    autoBioEnabled = true;
    await Matrix.sendMessage(m.from, { text: 'Auto bio activated!' });
  } else if (message === '/autobio off') {
    autoBioEnabled = false;
    clearInterval(autoBioInterval);
    await Matrix.sendMessage(m.from, { text: 'Auto bio disabled.' });
  }
};

export default autoBio;
