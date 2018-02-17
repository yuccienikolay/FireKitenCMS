import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

import Vue from './vue.js';

// loads the Icon plugin
UIkit.use(Icons);


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
var database = firebase.database();
// Object Post
class FireDir {
    constructor(link) {
        this.link = link;
    }
    set ref(values) {
        this.ref.set(values);
    }
    get ref() {
        return firebase.database().ref('/' + this.link);
    }
    clear() {
        this.ref = {};
    }
    watch(callback) {
        this.ref.on('value', callback(snapshot));
    }
    set(values) {
        this.ref = values
    }
    get() {
        let trythis = this;
        trythis.ref.once('value', function(snapshot){
            trythis.value = snapshot.val();
        });
    }
}

// Test
let me = new FireDir("lublunastenky");
me.ref = {is:true};
me.get();
console.log(me.value);


// Ready Document
$(document).ready(function () {

    AddProgLoader(100);

    let navbar = new Vue({
        el: '#navbar',
        data: {
            home: 'Самый красивый блог',
            about: 'Обо мне',
            other: 'Ссылки',
            otherdrops: [
                { text: 'В контакте', link: "https://vk.com/id276829154" },
                { text: 'В Фейскбуке', link: "https://www.facebook.com/Nicolay.Kiselev.V" }
            ],
            otherdropbottom: { text: 'Special Thing', link: "#" }
        },
        mounted: function () {
            this.$nextTick(function () {
                AddProgLoader(100);
            })
        }
    });

    let about = new Vue({
        el: '#about',
        data: {
            title: 'Обо мне',
            body: 'Равным образом консультация с широким активом влечет за собой процесс внедрения и модернизации позиций, занимаемых участниками в отношении поставленных задач.',
        },
        mounted: function () {
            this.$nextTick(function () {
                AddProgLoader(100);
            })
        }
    });

    let other = new Vue({
        el: '#other',
        data: {
            title: 'Дополнительно',
            body: 'Задача организации, в особенности же рамки и место обучения кадров в значительной степени обуславливает создание систем массового участия. Идейные соображения высшего порядка, а также реализация намеченных плановых заданий играет важную роль в формировании дальнейших направлений развития. Задача организации, в особенности же новая модель организационной деятельности представляет собой интересный эксперимент проверки дальнейших направлений развития. Повседневная практика показывает, что постоянное информационно-пропагандистское обеспечение нашей деятельности представляет собой интересный эксперимент проверки систем массового участия. Таким образом сложившаяся структура организации позволяет выполнять важные задания по разработке систем массового участия.',
        },
        mounted: function () {
            this.$nextTick(function () {
                AddProgLoader(100);
            })
        }
    });

    let footer = new Vue({
        el: '#footer',
        data: {
            copy: { text: 'By Kiselev Nikolay', link: 'https://github.com/yuccienikolay/FireKittenCMS' }
        },
        mounted: function () {
            this.$nextTick(function () {
                AddProgLoader(100);
            })
        }
    });


});
