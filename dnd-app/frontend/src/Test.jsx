import { Progress, Spinner, Toast, ToastBody, ToastHeader } from "reactstrap";

import "./assets/styles/Loading.css";

export function Test() {
	return (
		<>
			<Toast className="antique position-absolute start-50 translate-middle" id="load">
				<ToastHeader className="bisque" icon={<Spinner size="sm">Loading...</Spinner>}>
					Loading...
				</ToastHeader>
				<ToastBody>
					<Progress value={100} color="secondary" animated />
				</ToastBody>
			</Toast>
		</>
	);
}
