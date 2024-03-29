let autoBioInterval;
let autoBioEnabled = true;

const startAutoBio = (Matrix) => {
  autoBioInterval = setInterval(() => {
    if (autoBioEnabled) {
      const status = `📆 ${new Date().toLocaleDateString()} ⌚ ${new Date().toLocaleTimeString()} Matrix ⚡`;
      Matrix.updateProfileStatus(status)
    }
  }, 20000);
};

const autoBio = async (m, Matrix) => {
  
    //Matrix.sendMessage(Matrix.user.id, { text: 'AutoBio Activated' });
  
  const message = m.body.toLowerCase();

  if (message === '.autobio on' && !autoBioEnabled) {
    autoBioEnabled = true;
    startAutoBio(Matrix);
    await Matrix.sendMessage(m.from, { text: 'Auto bio activated!' });
  } else if (message === '.autobio off') {
    autoBioEnabled = false;
    clearInterval(autoBioInterval);
    await Matrix.sendMessage(m.from, { text: 'Auto bio disabled.' });
  }
};

export default autoBio;
