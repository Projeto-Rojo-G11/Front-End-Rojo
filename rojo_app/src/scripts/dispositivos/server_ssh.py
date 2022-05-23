import paramiko
import time

address = '10.0.0.61'
username =''
password = ''

def ssh_connect(command):
    # //instancia do paramiko
    ssh = paramiko.SSHClient()
    # //para conexao com server de senha e ip desconhecido
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    # //conexao
    ssh.connect(hostname=address, username=username, password=password)
    stdin, stdout, stderr = ssh.exec_command(command)
    # //fechamento do stdin para n ocorrer erro
    stdin.close()
    result = stdout.readline()
    return result

check_status = ssh_connect('system status mysqld')
if check_status:
    for line in check_status:
        result = line.replace('\n','')
        if 'Active' in line and 'running' in line:
            print(f'Servico em execucao')
        elif 'Active' in line and 'running' not in line:
            print(f'O servico nao esta funcionando')
            print(f'Iniciando o processo de inicializacao do servico')
            start = ssh_connect('systemctl start mysqld && system status mysqld')
            for line in start:
                if 'Active' in line and 'running' in line:
                    print(f'Servico em execucao')
                elif 'Active' in line and 'running' not in line:
                    print(f'O servico nao esta funcionando')

def reboot_server():
    c

