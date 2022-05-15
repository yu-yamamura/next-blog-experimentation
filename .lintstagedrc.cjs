module.exports = {
  '*.{ts,tsx}': 'npm run type',
  '*.css': 'npm run lint:style:fix',
  '*.{js,jsx,ts,tsx}': 'npm run lint:es:fix',
  '*.{js,jsx,ts,tsx,html,json}': 'npm run format:fix',
  '*': 'npm run test:ci',
};
