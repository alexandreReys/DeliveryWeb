import React, { useEffect, useState } from "react";
import { history } from "routes/history";
import Sweetalert2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import * as notificationService from "services/notificationService";

import store from "store";
import * as actions from "store/actions";
import "./styles.css";

const Swal = withReactContent(Sweetalert2);

//////////////////////////////////////////////////////////////////////////////
const Notifications = () => {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        store.dispatch(actions.actionAdminModuleActivate());
    }, []);


    const handleSubmit = () => {
        const sendingNotificationsAlert = () => {
            Swal.fire({
                icon: "success",
                title: "Enviando Notificações",
                text: "As notificações estão sendo enviadas ao servidor e em breve começarão a chegar nos dispositivos dos usuários do app",
                position: "top-end",
                background: "white",
                showConfirmButton: false,
                timer: 6000,
                timerProgressBar: true,
            }).then(() => {
                history.push("orders");
                return true;
            });
        };
        
        const confirmAndSend = async () => {
            Swal.fire({
                title: 'Confirma ?',
                text: "Esta notificação irá para todos os clientes com o app !!",
                icon: 'warning',
                position: "top-end",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, enviar !!',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    notificationService.postNotification(title, message);
                    sendingNotificationsAlert();
                }
            });
        };
        
        if (!validateFields({ title, message })) return false;
        confirmAndSend();
    };
    
    const handleExit = () => {
        history.push("orders");
    };

    return (
        <div id="notifications" className="notifications-container">
            <div className="notifications-header">
                <div className="notifications-header-text">
                    Notificações
                </div>
            </div>
            <div className="notifications-buttons">
                <button className="notifications-button" onClick={handleSubmit}>
                    Enviar
                </button>

                <button className="notifications-button" onClick={handleExit}>
                    Sair
                </button>
            </div>
            <div className="notifications-warning">
                <div className="notifications-warning-text">
                    As notificações disparadas aqui serão entregues em todos os aparelhos com o aplicativo Adega da Vila
                </div>
            </div>
            <div className="notifications-content">
                {/* title */}
                <div className="notifications-input-group">
                    <label className="notifications-label" htmlFor="title">
                        Titulo
                    </label>
                    <input
                        className="notifications-input"
                        name="title"
                        id="title"
                        required
                        autoComplete="new-password"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                {/* message */}
                <div className="notifications-input-group">
                    <label className="notifications-label" htmlFor="message">
                        Mensagem
                    </label>
                    <input
                        className="notifications-input"
                        name="message"
                        id="message"
                        required
                        autoComplete="new-password"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

const validateFields = (values) => {
    if (!values.title) {
        validateErrorMessage("Campo Titulo é obrigatório !!");
        return false;
    }
    if (!values.message) {
        validateErrorMessage("Campo Mensagem é obrigatório !!");
        return false;
    }

    return true;
};
const validateErrorMessage = (message) => {
    Swal.fire({
        icon: "error",
        title: message,
        text: "Oops ...",
        position: "top-end",
        background: "yellow",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
    });
};

export default Notifications;
