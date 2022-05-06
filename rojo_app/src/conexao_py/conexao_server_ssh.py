import paramiko

address = '10.0.0.61'
username =''
password = ''

# //instancia do paramiko
ssh = paramiko.SSHClient()
# //para conexao com server de senha e ip desconhecido
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
# //conexao
ssh.connect(hostname=address, username=username, password=password)
stdin, stdout, stderr = ssh.exec_command('ifconfig')
# //fechamento do stdin para n ocorrer erro
stdin.close()
# //mostra as info do equipamento
# print(stdout.readlines)
for line in stdout.readlines:
    print(line.replace('\n',''))

