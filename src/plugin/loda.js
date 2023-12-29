const handleGreeting = (m) => {
  
  console.log('Wow its Working.')
  
  if (m.body === 'Loda') {
    m.reply('Hello Lode');
  } 
};

export default handleGreeting;
