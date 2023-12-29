const handleGreeting = (m) => {
  console.log('its Working.')
  if (m.body === 'Hi') {
    m.reply('Hello');
  } else if (m.body === 'Hello') {
    m.reply('Ka bat he');
  } else if (m.body === 'How are you') {
    m.reply('I am Fine');
  }
};

export default handleGreeting;
