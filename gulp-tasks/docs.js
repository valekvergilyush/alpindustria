import gulp from 'gulp';

import PATHS from '../paths';

export default function robots() {
	return gulp.src(PATHS.src.docs).pipe(gulp.dest(PATHS.build.docs));
}
