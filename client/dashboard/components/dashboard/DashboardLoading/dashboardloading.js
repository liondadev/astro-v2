import Spinner from 'react-bootstrap/Spinner';

import styles from '../../../styles/spinner.module.scss'

function DashboardLoading() {
    return <>
        <div className={styles.spinnercard}>
            <Spinner animation="grow" />
            <p className={"text-muted"}>Loading...</p>
        </div>
    </>
}

export default DashboardLoading
