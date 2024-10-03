from ldap3 import Server, Connection, ALL, NTLM

# Configuration du serveur LDAP
LDAP_SERVER = "ldap://localhost:389" #"ldap://192.168.1.66:389"
LDAP_BASE_DN = 'dc=djezzy-collab,dc=com'
LDAP_USER_DN = "ou=users,dc=djezzy-collab,dc=com"  # DN utilisateur, basé sur le schéma LDAP
LDAP_BIND_USER = "cn=admin,dc=djezzy-collab,dc=com"   # Utilisateur d'administration pour effectuer les requêtes
LDAP_BIND_PASSWORD = "sara2004" #'Redabens2004..'  Mot de passe du bind user

def authenticate(username, password):
    # Connexion au serveur LDAP
    server = Server(LDAP_SERVER, get_info=ALL)
    conn = Connection(server, user=LDAP_BIND_USER, password=LDAP_BIND_PASSWORD)

    if not conn.bind():
        return 'serveur Ldap probleme'

    # Recherche de l'utilisateur dans l'annuaire LDAP
    search_filter = f'(uid={username})'
    conn.search(LDAP_USER_DN, search_filter,search_scope='SUBTREE')
    if not conn.entries:
        return 'username Incorrect'

    user_dn = conn.entries[0].entry_dn

    # Tentative de connexion avec les identifiants de l'utilisateur
    conn = Connection(server, user=user_dn, password=password)
    if conn.bind():
        return 'Authentification réussie'
    else:
        return 'Mot de passe Incorrect'

