var dataUnreadBadgeCounter = function(source) {
    var data = {};
    data.unread = source.isUnreads;
    if (data.unread < 1) {
        $('#suratmasuk').html('<i class="material-icons">&#xE3D3;</i>');
    } else if (data.unread < 2) {
        $('#suratmasuk').html('<i class="material-icons">&#xE3D0;</i>');
    } else if (data.unread < 3) {
        $('#suratmasuk').html('<i class="material-icons">&#xE3D1;</i>');
    } else if (data.unread < 4) {
        $('#suratmasuk').html('<i class="material-icons">&#xE3D2;</i>');
    } else if (data.unread < 5) {
        $('#suratmasuk').html('<i class="material-icons">&#xE3D4;</i>');
    } else if (data.unread < 6) {
        $('#suratmasuk').html('<i class="material-icons">&#xE3D5;</i>');
    } else if (data.unread < 7) {
        $('#suratmasuk').html('<i class="material-icons">&#xE3D5;</i>');
    } else if (data.unread < 8) {
        $('#suratmasuk').html('<i class="material-icons">&#xE3D7;</i>');
    } else if (data.unread < 9) {
        $('#suratmasuk').html('<i class="material-icons">&#xE3D8;</i>');
    } else if (data.unread < 10) {
        $('#suratmasuk').html('<i class="material-icons">&#xE3D9;</i>');
    } else {
        $('#suratmasuk').html('<i class="material-icons">&#xE3DA;</i>');
    }
};

var dataUnsignedBadgeCounter = function(source) {
    var data = {};
    data.unsigned = source.isUnsigned;
    if (data.unsigned < 1) {
        $('#suratkeluar').html('<i class="material-icons">&#xE3D3;</i>');
    } else if (data.unsigned < 2) {
        $('#suratkeluar').html('<i class="material-icons">&#xE3D0;</i>');
    } else if (data.unsigned < 3) {
        $('#suratkeluar').html('<i class="material-icons">&#xE3D1;</i>');
    } else if (data.unsigned < 4) {
        $('#suratkeluar').html('<i class="material-icons">&#xE3D2;</i>');
    } else if (data.unsigned < 5) {
        $('#suratkeluar').html('<i class="material-icons">&#xE3D4;</i>');
    } else if (data.unsigned < 6) {
        $('#suratkeluar').html('<i class="material-icons">&#xE3D5;</i>');
    } else if (data.unsigned < 7) {
        $('#suratkeluar').html('<i class="material-icons">&#xE3D5;</i>');
    } else if (data.unsigned < 8) {
        $('#suratkeluar').html('<i class="material-icons">&#xE3D7;</i>');
    } else if (data.unsigned < 9) {
        $('#suratkeluar').html('<i class="material-icons">&#xE3D8;</i>');
    } else if (data.unsigned < 10) {
        $('#suratkeluar').html('<i class="material-icons">&#xE3D9;</i>');
    } else {
        $('#suratkeluar').html('<i class="material-icons">&#xE3DA;</i>');
    }
};

var dataCorrectedBadgeCounter  = function(source) {
    var data = {};
    data.corrected = source.isCorrected;
    if (data.corrected < 1) {
        $('#suratkoreksi').html('<i class="material-icons">&#xE3D3;</i>');
    } else if (data.corrected < 2) {
        $('#suratkoreksi').html('<i class="material-icons">&#xE3D0;</i>');
    } else if (data.corrected < 3) {
        $('#suratkoreksi').html('<i class="material-icons">&#xE3D1;</i>');
    } else if (data.corrected < 4) {
        $('#suratkoreksi').html('<i class="material-icons">&#xE3D2;</i>');
    } else if (data.corrected < 5) {
        $('#suratkoreksi').html('<i class="material-icons">&#xE3D4;</i>');
    } else if (data.corrected < 6) {
        $('#suratkoreksi').html('<i class="material-icons">&#xE3D5;</i>');
    } else if (data.corrected < 7) {
        $('#suratkoreksi').html('<i class="material-icons">&#xE3D5;</i>');
    } else if (data.corrected < 8) {
        $('#suratkoreksi').html('<i class="material-icons">&#xE3D7;</i>');
    } else if (data.corrected < 9) {
        $('#suratkoreksi').html('<i class="material-icons">&#xE3D8;</i>');
    } else if (data.corrected < 10) {
        $('#suratkoreksi').html('<i class="material-icons">&#xE3D9;</i>');
    } else {
        $('#suratkoreksi').html('<i class="material-icons">&#xE3DA;</i>');
    }
};