import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

import Vue from './vue.js';

// loads the Icon plugin
UIkit.use(Icons);


// Salut to the gang
console.log("sup");


// Some simple function
var progress = 0;
function AddProgLoader(count) {
    progress += count;
    if (progress >= 100) {
        $("#loader").addClass("uk-hidden");
        $("#container").removeClass("uk-hidden");
    }
}


// Firebase
let database = firebase.database();
// Object Post
class FireDir {
    constructor(link = "") {
        this.link = link;
    }
    get ref() {
        return firebase.database().ref('/' + this.link);
    }
    set ref(values) {
        if (values) {
            this.ref.set(values);
        }
    }
    clear() {
        this.ref = {};
    }
    watch(callback, keycallback, keyval = keycallback) {
        this.ref.on('value', function(snapshot) {
            if (typeof callback == "function") {
                callback(snapshot.val(), snapshot)
            } else {
                let val = snapshot.val();
                callback[keycallback] = val[keyval]
            }
        })
    }
    pull(callback, keycallback, keyval = keycallback) {
        this.ref.once('value', function(snapshot) {
            if (typeof callback == "function") {
                callback(snapshot.val(), snapshot)
            } else {
                let val = snapshot.val();
                callback[keycallback] = val[keyval]
            }
        })
    }
    push(values) {
        this.ref = values;
    }
    each(callback) {
        this.ref.once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var key = childSnapshot.key;
                var childData = childSnapshot.val();
                callback(key, childData);
            })
        })
    }
}


// SETUP
if ($("#hackboard").parent().length) {
    UIkit.notification("Привет, владыка. Поступай мудро и аккуратно.");
    let root = new FireDir();
    root.pull(function(val) {
        $("#hackboard").val(JSON.stringify(val, null, "\t"));
        $("#hackok").click(function() {
            let update = JSON.parse($("#hackboard").val());
            root.push(update);
            UIkit.notification("Все поменялось.");
        });
    });
}
// FILL WITH FIRE
function letfirebase(html) {
    let chain = {};
    chain.navbar = new FireDir("navbar");
    chain.navbar.pull(html.navbar, "home");
    chain.navbar.pull(html.navbar, "about");
    chain.navbar.pull(html.navbar, "other");
    chain.navbar.pull(html.navbar, "otherdrops");
    chain.navbar.pull(html.navbar, "otherdropbottom");
    chain.navbar.pull(html.navbar, "imageurl");
    chain.about = new FireDir("about");
    chain.about.pull(html.about, "seen");
    chain.about.pull(html.about, "body");
    chain.about.pull(html.about, "title");
    chain.other = new FireDir("other");
    chain.other.pull(html.other, "seen");
    chain.other.pull(html.other, "body");
    chain.other.pull(html.other, "title");
    chain.footer = new FireDir("footer");
    chain.footer.pull(html.footer, "copy");
    chain.feed = new FireDir("postcollection");
    chain.feed.each(function(key, value) {
        html.feed.posts.push(value)
    })
    AddProgLoader(30);    
}
// END FILL


// Ready Document
$(document).ready(function () {

    let html = {}

    html.navbar = new Vue({
        el: '#navbar',
        data: {
            home: 'Самый красивый блог',
            about: 'Обо мне',
            other: 'Ссылки',
            otherdrops: [
                { text: 'В контакте', link: "https://vk.com/id276829154" },
                { text: 'В Фейскбуке', link: "https://www.facebook.com/Nicolay.Kiselev.V" }
            ],
            otherdropbottom: { text: 'Special Thing', link: "#" },
            imageurl: "https://source.unsplash.com/iNEXVlX-RLs/1900x900"
        },
        mounted: function () {
            this.$nextTick(function () {
                AddProgLoader(20);
            })
        }
    })

    html.about = new Vue({
        el: '#about',
        data: {
            title: 'Обо мне',
            body: '',
            seen: true
        },
        mounted: function () {
            this.$nextTick(function () {
                AddProgLoader(10);
            })
        }
    })

    html.other = new Vue({
        el: '#other',
        data: {
            title: 'Дополнительно',
            body: '',
            seen: true
        },
        mounted: function () {
            this.$nextTick(function () {
                AddProgLoader(10);
            })
        }
    })

    html.feed = new Vue({
        el: '#feed',
        data: {
            posts: []
        },
        mounted: function () {
            this.$nextTick(function () {
                AddProgLoader(20);
            })
        }
    })

    html.footer = new Vue({
        el: '#footer',
        data: {
            copy: { text: 'By Kiselev Nikolay', link: 'https://github.com/yuccienikolay/FireKittenCMS' }
        },
        mounted: function () {
            this.$nextTick(function () {
                AddProgLoader(10);
            })
        }
    })

    letfirebase(html);

})
