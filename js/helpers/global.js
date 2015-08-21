define([], function() {
    'use strict';
    return {
        getTimelineFilter: function(type) {
            var filterType = {
                'home' : [
                    {
                        param : '',
                        title : 'Semua Post',
                        class : 'col-xs-4',
                    },
                    {
                        param : 'idol',
                        title : 'Idol',
                        class : 'col-xs-4',
                    },
                    {
                        param : 'friend',
                        title : 'Teman',
                        class : 'col-xs-4',
                    }
                ],
                'idol' : [
                    {
                        param : '',
                        title : 'Idol',
                        class : 'col-xs-6'
                    },
                    {
                        param : 'user',
                        title : 'User',
                        class : 'col-xs-6',
                    }
                ]
            };

            if(typeof filterType[type] != 'undefined'){
                return filterType[type];
            }else{
                return [];
            }
        },

        getTemplateShoutByType : function(contentType){
            var templateLoader,
            baseUrl = '../app/views/sections/timeline/',
            templateMap = {
                text: {
                    html : baseUrl + 'text.html',
                    class : 'foto-post',
                },
                image: {
                    html : baseUrl + 'image.html',
                    class : 'curhat-post'
                },
                video: {
                    html : baseUrl + 'video.html',
                    class : 'video-post'
                }
            };

            var template = templateMap[contentType];
            
            return template;
        }
    }
});