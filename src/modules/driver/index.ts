import { Builder } from 'selenium-webdriver';
import edge from 'selenium-webdriver/edge';

export async function createDriver() {
  const options = new edge.Options();
  
  options.addArguments('--headless=new')
  options.addArguments('--ignore-ssl-errors=yes');
  options.addArguments('--ignore-certificate-errors');
  options.addArguments('--enable-chrome-browser-cloud-management');

  return new Builder().forBrowser('MicrosoftEdge').setEdgeOptions(options).build();
}