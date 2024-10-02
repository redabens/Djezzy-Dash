from ldap3 import Server, Connection, ALL, NTLM

# Configuration du serveur LDAP
LDAP_SERVER = 'ldap://192.168.1.66:389'
LDAP_BASE_DN = 'dc=djezzy-collab,dc=com'
LDAP_USER_DN = 'uid={username},ou=users,' + LDAP_BASE_DN  # DN utilisateur, basé sur le schéma LDAP
LDAP_BIND_USER = 'cn=admin'  + LDAP_BASE_DN   # Utilisateur d'administration pour effectuer les requêtes
LDAP_BIND_PASSWORD = 'Redabens2004..'  # Mot de passe du bind user