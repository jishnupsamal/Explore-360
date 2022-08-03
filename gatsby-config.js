module.exports = {
  siteMetadata: {
    title: `Explore 360`,
    description: `Aiding and Leading the Explorers of the World`,
    author: `@jishnu-prasad-s`,
    siteUrl: `https://explore360.netlify.app/`,
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Explore 360`,
        short_name: `Explore 360`,
        start_url: `/`,
        background_color: `#663399`,
        display: `standalone`,
        icon: `src/images/gatsby-icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/`],
      },
    },
  ],
}
