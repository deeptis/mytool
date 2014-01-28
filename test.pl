#!/usr/bin/perl
use CGI qw/:standard :html3 -noDebug/;
#use URI::Split qw/ uri_split uri_join /;

use Switch;
#use IO::Handle;
#use JSON;

print header('text/plain');

$full_url      = url();
$url_with_path = url(-path_info=>1);
#print url(-path_info=>1);

my %kvpair;

my ($netaddr, $pathinfo) = $url_with_path =~ m/($full_url)\/(.*)$/;
#print '<br>pathinfo: '. $pathinfo;

(@splitpath) = split("\/", $pathinfo);

#print '<br>splitpath: '. $splitpath[0];

switch ($splitpath[0]) {
	case 'myrest' {
		switch ($splitpath[1]) {
			case 'put' {
				if (($splitpath[2] eq 'key') && ($splitpath[4] eq 'value')) {
					&putvalue($splitpath[3], $splitpath[5]);
				}
				else {
					print "\ninvalid PUT";
				}
			}
			case 'fetch' {
				if ($splitpath[2] eq 'key') {
					print &fetchvalue($splitpath[3]);
				}
				else {
					print "\ninvalid FETCH";
				}
			}
			case 'delete' {
				if ($splitpath[2] eq 'key') {
					print &deletekey($splitpath[3]);
				}
				else {
					print "\ninvalid DELETE";
				}
			}
			case 'display' {
				if ($splitpath[2] eq 'all') {
					&read_kvpair();
					print &hash2json(%kvpair);
				}
				else {
					print "\ninvalid DISPLAY";
				}
			}
			else {
				print "\ninvalid API Method";
			}
		}
	}
	else {
		print "\ninvalid API";
	}
}

# ----------- End of main -----------

sub putvalue {
	my ($key) = @_[0]; 
	my ($value) = @_[1]; 
	
	&read_kvpair();
	$kvpair{$key} = $value;

	&write_kvpair();	
}

sub fetchvalue {
	my ($key) = @_; 
	&read_kvpair();
	return &hash2json(($key, $kvpair{$key}));
}

sub deletekey {
	my ($key) = @_;
	&read_kvpair();
	
	if (exists($kvpair{$key})) {
		my $value = $kvpair{$key};
		delete($kvpair{$key});
		&write_kvpair();
		return "{\"$key\" : \"$value\"}";
	}
	else {
		# Key not present, nothing to delete
		return '{}';
	}
}

sub read_kvpair {
	my $data_file = "./data/store.txt";

	open (FH, "<", "$data_file") or die "\nFailed $!";
	while (<FH>) {
		chomp($_);
		@dataline = split(',', $_);
		$kvpair{$dataline[0]} = $dataline[1];
	}
	close(FH);	
}

sub write_kvpair {
	my $data_file = "./data/store.txt";

	open (FH, ">$data_file") or die "\nFailed $!";
	foreach my $key(keys %kvpair) {
		print FH "$key,$kvpair{$key}\n";
	}	
	close(FH);	
}

sub hash2json {		
	my(%inputhash) = @_;
	my @jsonarray;
	
	foreach my $key(keys %inputhash) {
		push(@jsonarray, "\"$key\" : \"$kvpair{$key}\"");
	}
	return "{". (join ',', @jsonarray) . "}";
}
