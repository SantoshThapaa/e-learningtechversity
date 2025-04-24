import { User } from '../models/User.js';
import { Courses } from '../models/Courses.js';
import moment from 'moment';

const getUserStats = async (period) => {
    let startDate;

    if (period === 'Yearly') {
        startDate = moment().subtract(1, 'year').startOf('year');
    } else if (period === 'Monthly') {
        startDate = moment().subtract(1, 'month').startOf('month');
    } else {
        throw new Error('Invalid period');
    }

    try {
        const users = await User.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate.toDate() },
                },
            },
            {
                $group: {
                    _id: { $month: '$createdAt' },
                    count: { $sum: 1 },
                },
            },
            {
                $sort: { _id: 1 },
            },
        ]);

        if (!users || users.length === 0) {
            return [];  
        }

        return users.map(user => ({
            date: moment().month(user._id - 1).format('MMMM'),
            count: user.count,
        }));

    } catch (error) {
        console.error('Error in aggregation:', error);
        throw new Error('Error while fetching user stats');
    }
};

export const getUserRegistrationStats = async (req, res) => {
    const { period } = req.query;

    try {
        const stats = await getUserStats(period);
        res.json({ stats });
    } catch (error) {
        console.error('Error fetching user stats:', error);
        res.status(500).json({ message: 'Server error while fetching user stats' });
    }
};

export const getCoursesStatus = async (req, res) => {
    try {
        const courses = await Courses.find();
        const currentDate = moment();
        let completedCourses = 0;
        let inProgressCourses = 0;

        courses.forEach(course => {
            const endDate = moment(course.endDate); 
            if (endDate.isValid()) {
                if (endDate.isBefore(currentDate)) {
                    completedCourses++;
                } else {
                    inProgressCourses++;
                }
            } else {
                console.log(`Invalid endDate for course: ${course.title}`);
            }
        });

        res.json({
            completedCourses,
            inProgressCourses
        });
    } catch (error) {
        console.error('Error fetching courses status:', error);
        res.status(500).json({ message: 'Server error while fetching course status' });
    }
};