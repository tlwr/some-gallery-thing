require  'rufus-scheduler'
require  'sinatra'
require  'sinatra/json'
require  'thread'

require_relative 'photographers_gallery_fetcher'

get '/' do
  json({
    success: true,
    message: 'hello world',
  })
end

get '/galleries' do
  json([{
    name: "The Photographer's Gallery",
    link: '/gallery/photographers-gallery',
  }])
end

get '/gallery/photographers-gallery' do
  json({
    events: PhotographersGalleryFetcher.fetch
  })
end
