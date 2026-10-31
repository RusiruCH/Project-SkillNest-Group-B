import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  BookOpen,
  Layers,
  FileCheck2,
  Clock,
  AlertCircle,
  FileText,
  Edit,
  Trash2,
  Send,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import { courseService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import StatusBadge from '../components/StatusBadge';
import ConfirmModal from '../components/ConfirmModal';

const InstructorDashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatusTab, setSelectedStatusTab] = useState('all');

  // Modal states
  const [deleteModalState, setDeleteModalState] = useState({ isOpen: false, courseId: null, title: '' });
  const [submitModalState, setSubmitModalState] = useState({ isOpen: false, courseId: null, title: '' });
  const [toastMessage, setToastMessage] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const [coursesRes, statsRes] = await Promise.all([
        courseService.getInstructorCourses(),
        courseService.getInstructorStats(),
      ]);

      if (coursesRes?.courses) setCourses(coursesRes.courses);
      if (statsRes?.stats) setStats(statsRes.stats);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleDeleteCourse = async () => {
    if (!deleteModalState.courseId) return;
    try {
      await courseService.deleteCourse(deleteModalState.courseId);
      showToast('Course and curriculum deleted successfully.');
      setDeleteModalState({ isOpen: false, courseId: null, title: '' });
      loadData();
    } catch (err) {
      alert(err.message || 'Error deleting course');
    }
  };

  const handleSubmitForReview = async () => {
    if (!submitModalState.courseId) return;
    try {
      await courseService.submitCourseForApproval(submitModalState.courseId);
      showToast('Course submitted for administrator review (Module 02 approval workflow).');
      setSubmitModalState({ isOpen: false, courseId: null, title: '' });
      loadData();
    } catch (err) {
      alert(err.message || 'Error submitting course');
    }
  };

  const filteredCourses =
    selectedStatusTab === 'all'
      ? courses
      : courses.filter((c) => c.status === selectedStatusTab);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700 animate-slide-up">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
            Module 1: Course & Curriculum Management
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Instructor Studio Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Welcome back, <span className="font-semibold text-slate-800">{user?.name || 'Instructor'}</span>.
            Create, structure syllabus, and manage courses for the SkillNest platform.
          </p>
        </div>

        <Link
          to="/instructor/courses/new"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-100 transition shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          Create New Course
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500">Total Courses</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2">
            {stats?.totalCourses || courses.length}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Managed by you</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-100 bg-emerald-50/20 shadow-xs">
          <div className="text-xs font-semibold text-emerald-800">Approved & Live</div>
          <div className="text-2xl font-extrabold text-emerald-600 mt-2">
            {stats?.approvedCourses || courses.filter((c) => c.status === 'approved').length}
          </div>
          <div className="text-[11px] text-emerald-700/70 mt-1">Available to learners</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-100 bg-amber-50/20 shadow-xs">
          <div className="text-xs font-semibold text-amber-800">In Admin Review</div>
          <div className="text-2xl font-extrabold text-amber-600 mt-2">
            {stats?.pendingCourses || courses.filter((c) => c.status === 'pending_approval').length}
          </div>
          <div className="text-[11px] text-amber-700/70 mt-1">Module 02 queue</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500">Draft Status</div>
          <div className="text-2xl font-extrabold text-slate-700 mt-2">
            {stats?.draftCourses || courses.filter((c) => c.status === 'draft').length}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Unpublished work</div>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex border-b border-slate-200 space-x-6 text-sm font-semibold">
        {[
          { key: 'all', label: 'All Courses' },
          { key: 'draft', label: 'Drafts' },
          { key: 'pending_approval', label: 'Under Review' },
          { key: 'approved', label: 'Published' },
          { key: 'rejected', label: 'Needs Revision' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedStatusTab(tab.key)}
            className={`pb-3 transition relative ${
              selectedStatusTab === tab.key
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Course List Table / Cards */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-24 bg-slate-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filteredCourses.length > 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/60 transition"
            >
              <div className="flex items-start sm:items-center gap-4">
                <img
                  src={
                    course.thumbnail ||
                    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80'
                  }
                  alt={course.title}
                  className="w-20 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
                />

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={course.status} />
                    <span className="text-xs font-semibold text-slate-400 uppercase">
                      {course.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm leading-tight hover:text-indigo-600 transition">
                    <Link to={`/instructor/courses/${course._id}/curriculum`}>{course.title}</Link>
                  </h3>
                  <div className="text-xs text-slate-500 flex items-center gap-3">
                    <span>{course.structures?.length || 0} Topics</span>
                    <span>•</span>
                    <span>{course.level}</span>
                  </div>

                  {course.rejectionReason && course.status === 'rejected' && (
                    <div className="mt-1 text-xs text-rose-600 bg-rose-50 px-2 py-1 rounded-md border border-rose-200">
                      <strong>Admin Feedback:</strong> {course.rejectionReason}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0">
                <Link
                  to={`/instructor/courses/${course._id}/curriculum`}
                  className="px-3.5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition flex items-center gap-1.5 shadow-xs"
                >
                  <Layers className="w-3.5 h-3.5" />
                  Curriculum Builder
                </Link>

                <Link
                  to={`/instructor/courses/${course._id}/edit`}
                  title="Edit details"
                  className="p-2 text-slate-600 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 rounded-xl transition"
                >
                  <Edit className="w-4 h-4" />
                </Link>

                <Link
                  to={`/courses/${course._id}`}
                  title="Preview learner view"
                  className="p-2 text-slate-600 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 rounded-xl transition"
                >
                  <Eye className="w-4 h-4" />
                </Link>

                {course.status === 'draft' && (
                  <button
                    onClick={() =>
                      setSubmitModalState({
                        isOpen: true,
                        courseId: course._id,
                        title: course.title,
                      })
                    }
                    className="px-3 py-2 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Submit for Approval
                  </button>
                )}

                <button
                  onClick={() =>
                    setDeleteModalState({
                      isOpen: true,
                      courseId: course._id,
                      title: course.title,
                    })
                  }
                  title="Delete course"
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-4">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No courses in this category</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            Get started by creating your first course and adding topics and learning materials.
          </p>
          <Link
            to="/instructor/courses/new"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-indigo-600 rounded-xl"
          >
            <PlusCircle className="w-4 h-4" />
            Create Course
          </Link>
        </div>
      )}

      {/* Confirmation Modals */}
      <ConfirmModal
        isOpen={deleteModalState.isOpen}
        title="Delete Course?"
        message={`Are you sure you want to permanently delete "${deleteModalState.title}"? All associated topics and uploaded learning materials will also be deleted.`}
        confirmText="Delete Course"
        confirmColor="bg-rose-600"
        onConfirm={handleDeleteCourse}
        onCancel={() => setDeleteModalState({ isOpen: false, courseId: null, title: '' })}
      />

      <ConfirmModal
        isOpen={submitModalState.isOpen}
        title="Submit Course for Administrator Approval?"
        message={`Are you ready to submit "${submitModalState.title}" for review? Once submitted, the course will move to the administrator approval queue (Module 02) before publication to learners.`}
        confirmText="Submit for Review"
        confirmColor="bg-amber-600"
        onConfirm={handleSubmitForReview}
        onCancel={() => setSubmitModalState({ isOpen: false, courseId: null, title: '' })}
      />
    </div>
  );
};

export default InstructorDashboard;

