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
                    allowed: true,
                    id: 'suratmasuk',
                    hascounter: true
                }, {
                    name: 'Surat Keluar',
                    state: 'home.suratKeluar',
                    type: 'link',
                    icon: 'fa fa-upload',
                    allowed: true,
                    id: 'suratkeluar',
                    hascounter: true
                },
                {
                    name: 'Surat Koreksi',
                    state: 'home.suratKoreksi',
                    type: 'link',
                    icon: 'fa fa-edit',
                    allowed: $rootScope.userInfo.jenis_user === '2',
                    id: 'suratkoreksi',
                    hascounter: true
                }],
            allowed: true
        });

        sections.push({
            name: 'Management User',
            type: 'toggle',
            pages: [{
                    name: 'Tambah Account',
                    type: 'link',
                    state: 'home.tambahAccount',
                    icon: 'fa fa-inbox',
                    allowed: true
                }, {
                    name: 'Tambah Instansi',
                    state: 'home.tambahInstansi',
                    type: 'link',
                    icon: 'fa fa-upload',
                    allowed: true
                },
                {
                    name: 'Tambah Institusi',
                    state: 'home.tambahInstitusi',
                    type: 'link',
                    icon: 'fa fa-edit',
                    allowed: true
                }],
//            allowed: $rootScope.userInfo.jenis_user === '2'
            allowed: true
        });
        
        sections.push({
            name: 'Management Surat',
            type: 'toggle',
            pages: [{
                    name: 'Tambah Kode Unit',
                    state: 'home.tambahKodeUnit',
                    type: 'link',
                    icon: 'fa fa-upload',
                    allowed: true
                },{
                    name: 'Tambah Kode Hal',
                    state: 'home.tambahKodeHal',
                    type: 'link',
                    icon: 'fa fa-upload',
                    allowed: true
                }],
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
        
        
        sections.push({
            name: 'Edit Biodata',
            state: 'home.editBio',
            type: 'link',
            allowed: true
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