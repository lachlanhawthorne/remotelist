/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')
const withTM = require('next-transpile-modules')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = withPlugins([
  withImages(),
  withTM([
    '@remotelist/app',
    '@remotelist/data-access',
  ])
], nextConfig)
