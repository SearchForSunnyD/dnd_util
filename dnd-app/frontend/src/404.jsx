export function NotFound() {
	return (
		<div className="container d-flex flex-column p-2 align-items-center justify-content-center bisque rounded">
			<h1 className="display-1 border-bottom">ERROR 404</h1>
			<p className="h4">
				<span className="text-danger">Oops!</span> Page not found.
			</p>
			<p className="lead">The page you’re looking for doesn’t exist.</p>
			<a href="/" className="btn btn-primary">
				HOME
			</a>
		</div>
	);
}
