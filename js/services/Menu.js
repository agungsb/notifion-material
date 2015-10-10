'use strict';

app.factory('menu', [
    '$location',
    '$rootScope',
    function($location, $rootScope) {

        var sections = [];

        sections.push({
            name: 'Surat',
            type: 'toggle',
            pages: [{
                    name: 'Surat Masuk',
                    type: 'link',
                    state: 'home.suratMasuk',
                    icon: 'fa fa-inbox',
                    allowed: true
                }, {
                    name: 'Surat Keluar',
                    state: 'home.suratKeluar',
                    type: 'link',
                    icon: 'fa fa-upload',
                    allowed: true
                },
                {
                    name: 'Surat Koreksi',
                    state: 'home.suratKoreksi',
                    type: 'link',
                    icon: 'fa fa-edit',
                    allowed: true
                }],
            allowed: true
        });

        sections.push({
            name: 'Edit Biodata',
            state: 'home.editBio',
            type: 'link',
            allowed: true
        });

        sections.push({
            name: 'Tambah User SA',
            state: 'home.tambahUser',
            type: 'link',
//            allowed: $rootScope.userInfo.jenis_user === '2'
            allowed: true
        });

        sections.push({
            name: 'Buat Surat',
            state: 'home.buatSurat',
            type: 'link',
            allowed: true
//            allowed: $rootScope.userInfo.jenis_user === '2'
        });

        var self;

        return self = {
            sections: sections,
            toggleSelectSection: function(section) {
                self.openedSection = (self.openedSection === section ? null : section);
            },
            isSectionSelected: function(section) {
                return self.openedSection === section;
            },
            selectPage: function(section, page) {
                page && page.url && $location.path(page.url);
                self.currentSection = section;
                self.currentPage = page;
            }
        };

    }]);