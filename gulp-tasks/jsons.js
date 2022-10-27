import gulp from 'gulp';

import PATHS from '../paths';

export default function jsons() {
	return gulp.src(PATHS.src.jsons).pipe(gulp.dest(PATHS.build.jsons));
}
