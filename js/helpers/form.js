        var formSerializeObject = function(form) {
            var o = {};
            var a = form.serializeArray();
            $.each(a, function() {
                if (o[this.name] !== undefined) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        };
        var searchObject = function(obj, name, value) {
            var array = $.map(obj, function(v, i) {
                var haystack = v[name];
                var needle = new RegExp(value);
                // check for string in haystack
                // return the matched item if true, or null otherwise
                return needle.test(haystack) ? v : null;
            });
            return array;
        }