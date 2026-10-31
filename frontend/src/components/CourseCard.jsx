import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, User, Layers, ArrowRight } from 'lucide-react';
import StatusBadge from './StatusBadge';

const CourseCard = ({ course, isInstructorView = false, onEdit, onDelete, onSubmitReview }) => {
  const topicCount = course.structures?.length || 0;
  
  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 hover:border-indigo-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      {/* Thumbnail Banner */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <img
          src={
            course.thumbnail ||
            'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'
          }
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase rounded-md bg-white/90 text-slate-800 shadow-sm backdrop-blur-sm">
            {course.category}
          </span>
          <span className="px-2.5 py-1 text-[11px] font-semibold rounded-md bg-indigo-900/80 text-white shadow-sm backdrop-blur-sm">
            {course.level}
          </span>
        </div>

        {isInstructorView && (
          <div className="absolute top-3 right-3">
            <StatusBadge status={course.status} />
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-bold text-slate-900 text-lg leading-snug group-hover:text-indigo-600 transition line-clamp-2">
          {course.title}
        </h3>
        
        <p className="mt-2 text-sm text-slate-500 line-clamp-2 leading-relaxed">
          {course.subtitle || course.description}
        </p>

        {/* Metadata info */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-slate-400" />
            <span>{topicCount} {topicCount === 1 ? 'Topic' : 'Topics'}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <img
              src={course.instructor?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
              alt={course.instructor?.name || 'Instructor'}
              className="w-4 h-4 rounded-full object-cover"
            />
            <span className="truncate max-w-[120px]">{course.instructor?.name || 'L.M.R.C. Bandara'}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-5 pt-3">
          {isInstructorView ? (
            <div className="flex items-center gap-2">
              <Link
                to={`/instructor/courses/${course._id}/curriculum`}
                className="flex-1 text-center py-2 px-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition"
              >
                Curriculum
              </Link>
              <Link
                to={`/instructor/courses/${course._id}/edit`}
                className="py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
              >
                Edit
              </Link>
              {course.status === 'draft' && onSubmitReview && (
                <button
                  onClick={() => onSubmitReview(course._id)}
                  className="py-2 px-3 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition"
                >
                  Submit
                </button>
              )}
            </div>
          ) : (
            <Link
              to={`/courses/${course._id}`}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-bold text-indigo-600 hover:text-white bg-indigo-50 hover:bg-indigo-600 rounded-xl transition-all duration-200"
            >
              <span>Explore Course</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

