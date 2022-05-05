from email.headerregistry import Address
import paramiko

address = '10.0.0.61'
username =''
password = ''

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(hostname=address, username=username, password=password)
stdin, stdout, stderr = ssh.exec_command('ifconfig')
stdin.close()

