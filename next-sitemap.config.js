/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://farzanabbas.onrender.com', // <-- Replace with your exact URL
  generateRobotsTxt: true, // Optional: creates a robots.txt file for you
  sitemapSize: 7000,
  outDir: './public', // Tells the script to place the sitemap in your public folder

  // Specify any pages you want to exclude, if necessary
  exclude: ['/404', '/server-sitemap.xml'], 
}