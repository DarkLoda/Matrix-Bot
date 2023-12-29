// Matrix Command Line

import inquirer from 'inquirer';

export async function askAuthMethod() {
  const answer = await inquirer.prompt({
    name: 'authMethod',
    type: 'list',
    message: 'Select authentication method:',
    choices: ['Pairing Code', 'QR Code', 'Mobile OTP', 'Logged-in'],
  });
  return answer.authMethod;
}

export async function askMobileNumber() {
  const country = await inquirer.prompt({
    name: 'code',
    type: 'input',
    message: 'Enter your country code:',
  });

  const mobile = await inquirer.prompt({
    name: 'number',
    type: 'input',
    message: 'Enter your mobile number:',
  });

  const countryCode = country.code;
  const mobileNumber = mobile.number;

  return `${countryCode}${mobileNumber}`;
}

export function setAuthOptions(authMethod) {
  const usePairingCode = authMethod === 'Pairing Code';
  const useQR = authMethod === 'QR Code';

  return { usePairingCode, useQR };
}
