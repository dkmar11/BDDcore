Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/bionic64"
  config.vm.provision :docker
  config.vm.define "testing-server" do |ci|
    config.vm.provider "virtualbox" do |vb|
      vb.memory = "2054"
    end
    ci.vm.network "private_network", ip: '192.168.56.60'
    ci.vm.hostname = "testing-server"
    ci.vm.synced_folder "C:/Users/win11/Documents/proyectos/github/BDDcore", 
                        "/home/vagrant/test",
                        exclude:["reports", "node_modules", "package-lock.json", "*.log"]
    ci.vm.provision :shell, inline: "sudo chmod 777 /var/run/docker.sock"
  end
end
