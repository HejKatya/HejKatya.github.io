import React from 'react';
import { useState, useEffect } from 'react';
import styles from './CreditForm.module.css'

const CreditForm = () => {
    const [verifyBtn, setVerifyBtn] = useState()
    const [name, setName] = useState('')
    const [verifyName, setVerifyName] = useState()
    const [number, setNumber] = useState('')
    const [verifyNumber, setVerifyNumber] = useState()
    const [date, setDate] = useState('')
    const [verifyDate, setVerifyDate] = useState(false)
    const [cvv, setCvv] = useState('')
    const [verifyCvv, setVerifyCvv] = useState()

    useEffect(() => {
        if (verifyName && verifyNumber && verifyDate && verifyCvv) {
            setVerifyBtn(true)
        }
    }, [verifyName, verifyNumber, verifyDate, verifyCvv])

    useEffect(() => {
        if (name) {
            const regex = /^[a-zA-Z.-]*\s[a-zA-Z.-]{1,21}$/
            const match = regex.exec(name)
            if (match) {
                setVerifyName(true)
            } else {
                setVerifyName(false)
            }
        }
    }, [name])

    useEffect(() => {
        if (number) {
            const pureNumber = number.replace(/\s/g, '')
            const regex = /^[0-9]{16}$/
            const match = regex.exec(pureNumber)
            if (match) {
                setVerifyNumber(true)
            } else {
                setVerifyNumber(false)
            }
        }
    }, [number])

    useEffect(() => {
        if (date) {
            const pureDate = date.replace(/[^\d]/g, '')
            const regex = /^[0-9]{1,4}$/
            const match = regex.exec(pureDate)
            let currentDate = new Date()
            currentDate = `${(currentDate.getMonth() + 1).toString().length < 2 ? '0' + (currentDate.getMonth() + 1).toString() : (currentDate.getMonth() + 1).toString()}${currentDate.getFullYear().toString().slice(2)}`
            if (match && pureDate.length === 4) {
                if (Number(pureDate.slice(0, 2)) < 13 && Number(pureDate.slice(0, 2)) > 0) {
                    if (Number(pureDate.slice(-2)) >= Number(currentDate.slice(-2))) {
                        if (Number(pureDate.slice(-2)) > Number(currentDate.slice(-2))) {
                            setVerifyDate(true)
                        } else if (Number(pureDate.slice(-2)) === Number(currentDate.slice(-2))) {
                            if (Number(pureDate.slice(0, 2)) >= Number(currentDate.slice(0, 2))) {
                                setVerifyDate(true)
                            }
                        }
                    }
                }
            } else {
                setVerifyDate(false)
            }
        }
    }, [date])

    useEffect(() => {
        if (cvv) {
            const regex = /^[0-9]{3}$/
            const match = regex.exec(cvv)
            if (match) {
                setVerifyCvv(true)
            } else {
                setVerifyCvv(false)
            }
        }
    }, [cvv])

    const formatNumber = value => {
        if (!value) return value;
        const number = value.replace(/[^\d]/g, '');
        const numberLength = number.length;
        if (numberLength < 5) return number;
        if (numberLength < 9) {
            return `${number.slice(0, 4)} ${number.slice(4)}`;
        }
        if (numberLength < 13) {
            return `${number.slice(0, 4)} ${number.slice(4, 8)} ${number.slice(8)}`
        }
        if (numberLength < 17) {
            return `${number.slice(0, 4)} ${number.slice(4, 8)} ${number.slice(8, 12)} ${number.slice(12, )}`
        }
    }

    const handleNumber = value => {
        const formattedNumber = formatNumber(value)
        setNumber(formattedNumber)
    }

    const formatDate = value => {
        if (!value) return value;
        const date = value.replace(/[^\d]/g, '');
        const dateLength = date.length
        if (dateLength < 2) return date
        if (dateLength === 2) {
            return `${date}/`
        } 
        return `${date.slice(0, 2)}/${date.slice(2)}`
    }

    const handleDate = value => {
        const formattedDate = formatDate(value)
        setDate(formattedDate)
    }
    
  return (
    <form className={styles.container}>
        <img className={styles.avatar} src="/imgs/Avatar.svg" alt=""/>
        <h2 className={styles.heading}>Информация об оплате</h2>
        <label className={styles.input_container}>
            <span className={styles.label}>Держатель карты</span>
            <input className={name && !verifyName ? `${styles.input} ${styles.input_error} ${styles.input_filled}` : name ? `${styles.input} ${styles.input_filled}` : `${styles.input}`}
             type="text" placeholder='Ivan Ivanov'
             value={name}
             onInput={e => {setName(e.target.value)}} 
             minLength='2' maxLength='21'
             style={{textTransform: 'uppercase'}}/>
        </label>
        <label className={styles.input_container}>
            <span className={styles.label}>Номер карты</span>
            <input className={number && !verifyNumber ? `${styles.input} ${styles.input_error} ${styles.input_filled}` : number ? `${styles.input} ${styles.input_filled}` : `${styles.input}`}
             type="text" placeholder='1234 1234 1234 1234' 
             value={number}
             onInput={e => {setNumber(e.target.value)}}
             onChange={e => {handleNumber(e.target.value)}}
             minLength={19}
             maxLength={19}/>
        </label>
        <div className={styles.inline_inputs}>
        <label className={styles.input_container}>
            <span className={styles.label}>Срок действия</span>
            <input className={date && !verifyDate ? `${styles.input} ${styles.input_error} ${styles.input_date} ${styles.input_filled}` : date ? `${styles.input} ${styles.input_filled} ${styles.input_date}` : `${styles.input} ${styles.input_date}`} 
            type="text" placeholder='ММ/ГГ' 
            value={date}
            onInput={e => {setDate(e.target.value)}}
            onChange={e => {handleDate(e.target.value)}}
            minLength={5}
            maxLength={5}/>
        </label>
        <label className={styles.input_container}>
            <span className={styles.label}>CVV</span>
            <input className={cvv && !verifyCvv ? `${styles.input} ${styles.input_error} ${styles.input_cvv} ${styles.input_filled}` : cvv ? `${styles.input} ${styles.input_filled} ${styles.input_cvv}` : `${styles.input} ${styles.input_cvv}`} 
            type="password" placeholder='123' 
            value={cvv}
            onInput={e => {setCvv(e.target.value)}}
            minLength={3}
            maxLength={3}/>
        </label>
        </div>
        <button className={styles.btn} disabled={verifyBtn ? false : true}>Подтвердить оплату</button>
        <div className={styles.info}>Все поля обязательные</div>
    </form>
  )
}

export default CreditForm