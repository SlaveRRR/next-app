import Link from 'next/link'
import React, {FC} from 'react'

import styles from './pagination.module.scss'

type Props = {
    page:number;
    max:number;

}

const Pagination : FC<Props> = ({page,max}) => {
    
    return (
        <div className={styles['pagination']}>
           {page > 1 &&  <Link className={styles['pagination__item']} href={`/article?page=${page > 1 ? page - 1 : 1}`}>Previous</Link>}
            {page !== max && <Link className={styles['pagination__item']} href={`/article?page=${page + 1}`}>Next</Link>}
        </div>
    )
}

export default React.memo(Pagination);