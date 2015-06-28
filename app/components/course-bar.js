/**
 * Created by Dan on 6/5/15.
 */
import Ember from "ember";

export default Ember.Component.extend({
    setCourseOrder: function(){
        var savedOrder = this.get('savedOrder');
        /* Legacy Support - Remove in October 2015*/
            savedOrder = savedOrder.replace(/Panel/g, '');
        /* End Legacy Support*/
        if (savedOrder.length){
            var courseOrder = savedOrder.split(',').map(Number);
            var courses = this.get('courses');
            var i=0;
            courseOrder.forEach(function(course_id){
                courses.store.find('course', course_id).then( function(course){
                    i++;
                    course.set('sortOrder', i);
                    courses.set('content', courses.get('content').sortBy('sortOrder'));
                });
            });
        }

    }.on('init'),
    sendCourseOrder: function(order){
        Ember.$.ajax({
            url: "/api/teacher/settings/order",
            type: 'PUT',
            dataType: 'text',
            data: order,
            success: function () {
                console.log("Rceived:" + order);
            }
        });
    },
    actions: {
        modal: function (route, param) {
            this.sendAction('modal', route, param);
        },
        reorderItems(newOrder) {
            this.set('courses', newOrder);
            var courseOrder = [];
            newOrder.forEach(function(course){
               courseOrder.push(course.id);
            });
            this.sendCourseOrder(courseOrder.toString());
        }
    }
});