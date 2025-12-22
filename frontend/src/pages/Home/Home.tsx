import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.welcomeCard}>
        <h1 className={styles.title}>Bem-vindo ao PDPw</h1>
        <p className={styles.subtitle}>
          Sistema de Planejamento e Programação da Operação Energética
        </p>
        <div className={styles.description}>
          <p>
            O PDPw é o sistema responsável pelo gerenciamento e controle das atividades
            relacionadas ao planejamento da operação do Sistema Interligado Nacional (SIN).
          </p>
          <p>
            Utilize o menu de navegação para acessar as funcionalidades disponíveis.
          </p>
        </div>
      </div>
    </div>
  );
}
