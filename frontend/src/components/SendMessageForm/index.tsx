import { FormEvent, useContext, useState } from 'react';
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc';
import { AuthContext } from '../../contexts/Auth';
import { api } from '../../services/api';
import styles from './styles.module.scss';
import Lottie from 'react-lottie';
import animationData from '../../lotties/sucess.json';

export function SendMessageFrom() {
  const { user, signOut } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(false);
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  async function handleSendMessage(event: FormEvent) {
    event.preventDefault();
    if (!message.trim()) {
      return;
    }
    setStatus(true);

    await api.post('messages', { message });

    setMessage('');
    setTimeout(() => {
      setStatus(false);
    }, 1000);
  }

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button className={styles.signOutButton} onClick={signOut}>
        <VscSignOut size="32" />
      </button>

      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGitHub}>
          <VscGithubInverted size="16" />
          {user?.login}
        </span>
      </header>
      <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
        <label htmlFor="message">Mensagem</label>
        <textarea
          name="message"
          id="'message"
          placeholder="Qual sua expectativa para o evento?"
          onChange={(event) => setMessage(event.target.value)}
          value={message}
          disabled={status}
        />
        {!!status ? (
          <Lottie
            options={defaultOptions}
            isStopped={!status}
            isClickToPauseDisabled
            style={{ position: 'absolute', width: '100%', top: 0 }}
          />
        ) : (
          <button type="submit">Enviar mensagem</button>
        )}
      </form>
    </div>
  );
}
